# narendragupta.in on the server

The site is a static Astro build. Nginx serves it directly, so it needs no Node process and no
memory budget. It shares the AWS EC2 (t4g.small, Mumbai) with Jobtiva, which is set up by the
job-management-portal repo's `deploy/VPS.md`. **Do that server setup first.**

Isolation: the site belongs to its own Linux user, **`portfolio`**:

- no Docker access, no sudo;
- owns only `/srv/portfolio`;
- GitHub Actions logs in as this user with a key used only for this repo.

So a leaked portfolio deploy key can't touch Jobtiva's data. The Jobtiva `deploy` user is in the
docker group, which is effectively root.

```
/srv/portfolio/
  incoming/          CI uploads <sha>.tgz here
  releases/<sha>/    unpacked builds (newest 3 kept)
  current -> releases/<sha>    Nginx root; switched atomically by publish.sh
```

## 1. Server setup (once)

As root (`ssh ubuntu@<IP>`, then `sudo -i`):

```bash
adduser --disabled-password --gecos "" portfolio
install -d -o portfolio -g portfolio -m 755 /srv/portfolio /srv/portfolio/releases
install -d -o portfolio -g portfolio -m 700 /srv/portfolio/incoming
install -d -o portfolio -g portfolio -m 700 /home/portfolio/.ssh
```

Make a CI key on the laptop:

```bash
ssh-keygen -t ed25519 -f portfolio-ci -C "github-actions@portfolio" -N ""
```

Append `portfolio-ci.pub` to `/home/portfolio/.ssh/authorized_keys` (owner `portfolio`,
mode 600).

Copy this repo's `deploy/vps/narendragupta.in.conf` to the server, then as root:

```bash
cp narendragupta.in.conf /etc/nginx/sites-available/
ln -s /etc/nginx/sites-available/narendragupta.in.conf /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

## 2. GitHub (this repo)

Under **Settings → Secrets and variables → Actions**:

- **Secrets:**
  - `VPS_HOST` = `13.205.239.50`.
  - `VPS_USER` = `portfolio`.
  - `VPS_SSH_KEY` = the contents of `portfolio-ci` (then delete it from the laptop).
  - `VPS_KNOWN_HOSTS` = the output of `ssh-keyscan -t ed25519 13.205.239.50`, run after the IP has moved.

## 3. Cutover — done 2026-10-18

The site moved from the old t3.micro (`/var/www/narendragupta.in`, SSM deploy) to this box together
with the Elastic IP, so DNS never changed. First publish via the workflow, then
`certbot --nginx -d narendragupta.in -d www.narendragupta.in --redirect`. The old instance, its
SSM workflow steps and the OIDC role are gone.

## Rollback / day-2

- **Roll back the site:**
  ```bash
  ls -t /srv/portfolio/releases/
  ln -sfn /srv/portfolio/releases/<older-sha> /srv/portfolio/current
  ```
