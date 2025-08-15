# PrintaRex Front-End Deployment Instructions

## 🚀 Deploy to Hostinger VPS

### Server Information
- **Public IP**: 31.97.188.46
- **SSH Username**: isiam
- **SSH Password**: 8uMRDDbg7AJNtOqmz9VH

---

## 📋 Prerequisites
- SSH client (PuTTY on Windows, Terminal on Mac/Linux)
- Git installed on the VPS
- Docker and Docker Compose (will be installed during setup)

---

## 🔧 Step-by-Step Deployment

### Step 1: Connect to VPS via SSH
```bash
ssh root@31.97.188.46
```
**Password**: `8uMRDDbg7AJNtOqmz9VH@`

### Step 2: Update System and Install Dependencies
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y curl wget git unzip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker root

# Install Docker Compose
sudo apt install -y docker-compose


# Start and enable Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify Docker installation
docker --version
docker-compose --version
```

### Step 3: Logout and Reconnect
```bash
exit
```
Then reconnect:
```bash
ssh root@31.97.188.46
```

### Step 4: Clone Repository
```bash
# Navigate to home directory
cd /home/isiam

# Clone the repository
git clone https://github.com/IbrahimSiam/PrintaRex-Front-End.git

# Navigate to project directory
cd PrintaRex-Front-End

# List files to verify
ls -la
```
sync the changes from GitHub to your server folder
Option 1: Pull the latest changes (recommended)
cd /home/ubuntu/PrintaRex-Front-End
git pull origin main




### Step 5: Configure Docker Compose for Production
The project already includes a production-ready `docker-compose.yml` file that:
- Builds the React application
- Serves it through Nginx
- Exposes port 80
- Includes health checks
- Auto-restarts on failure

### Step 6: Build and Deploy
```bash
# Build and start the container
sudo docker-compose up -d --build
docker-compose build
# or
docker build -t printarex-frontend .



# Check container status
sudo docker ps

# View logs
sudo docker-compose logs -f
```

### Step 7: Configure Firewall
```bash
# Allow HTTP traffic
sudo ufw allow 80/tcp

# Allow SSH traffic
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable

# Check firewall status
sudo ufw status
```

---

## 🌐 Access Your Application

### Primary URL
- **http://31.97.188.46**

### Test the deployment
```bash
# Test from the server
curl -I http://localhost

# Check if port 80 is listening
sudo netstat -tlnp | grep :80
```

---

## 🔄 Update and Maintenance

### Manual Update
```bash
# Navigate to project directory
cd /home/isiam/PrintaRex-Front-End

# Pull latest changes
git pull origin main

# Rebuild and restart
sudo docker-compose down
sudo docker-compose up -d --build
```

### Automatic Updates (Recommended)
Create an update script:
```bash
nano /home/isiam/update.sh
```

Add this content:
```bash
#!/bin/bash
cd /home/isiam/PrintaRex-Front-End
git pull origin main
sudo docker-compose down
sudo docker-compose up -d --build
echo "Update completed at $(date)" >> /home/isiam/update.log
```

Make it executable:
```bash
chmod +x /home/isiam/update.sh
```

Set up daily updates:
```bash
crontab -e
```

Add this line:
```bash
0 2 * * * /home/isiam/update.sh
```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Container won't start
```bash
# Check logs
sudo docker-compose logs

# Check container status
sudo docker ps -a

# Restart Docker service
sudo systemctl restart docker
```

#### 2. Port 80 already in use
```bash
# Check what's using port 80
sudo netstat -tlnp | grep :80

# Stop conflicting service
sudo systemctl stop apache2  # if Apache is running
sudo systemctl stop nginx     # if Nginx is running
```

#### 3. Permission denied
```bash
# Fix Docker permissions
sudo usermod -aG docker isiam
# Logout and login again
```

#### 4. Build fails
```bash
# Clean Docker cache
sudo docker system prune -a

# Rebuild without cache
sudo docker-compose build --no-cache
```

---

## 📊 Monitoring

### Check Application Health
```bash
# Container status
sudo docker ps

# Resource usage
sudo docker stats

# Application logs
sudo docker-compose logs -f printarex-frontend

# Health check
curl -f http://31.97.188.46/ || echo "Application is down"
```

### System Resources
```bash
# Disk usage
df -h

# Memory usage
free -h

# CPU usage
top
```

---

## 🔒 Security Considerations

### Firewall Rules
- Only ports 22 (SSH) and 80 (HTTP) are open
- All other ports are blocked by default

### Regular Updates
- System updates: `sudo apt update && sudo apt upgrade`
- Application updates: Automatic via cron job
- Docker updates: `sudo apt upgrade docker-ce`

---

## 📞 Support

### Useful Commands Reference
```bash
# Start application
sudo docker-compose up -d

# Stop application
sudo docker-compose down

# Restart application
sudo docker-compose restart

# View logs
sudo docker-compose logs -f

# Check status
sudo docker-compose ps

# Update application
/home/isiam/update.sh
```

### Log Locations
- **Application logs**: `sudo docker-compose logs -f`
- **System logs**: `/var/log/syslog`
- **Update logs**: `/home/isiam/update.log`

---

## 🎯 Next Steps

1. **Domain Setup**: Point your domain to `31.97.188.46`
2. **SSL Certificate**: Install Let's Encrypt for HTTPS
3. **Monitoring**: Set up uptime monitoring
4. **Backup**: Configure regular backups
5. **CI/CD**: Set up GitHub Actions for automatic deployment

---

## ✅ Deployment Checklist

- [ ] SSH connection established
- [ ] Docker installed and running
- [ ] Repository cloned
- [ ] Application built and deployed
- [ ] Firewall configured
- [ ] Application accessible at http://31.97.188.46
- [ ] Update script created
- [ ] Cron job configured
- [ ] Health checks passing

---

**🎉 Congratulations! Your PrintaRex Front-End is now deployed and running on Hostinger VPS!**
