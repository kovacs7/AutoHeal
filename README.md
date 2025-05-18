
# 🔧 AutoHeal — Self-Healing Infrastructure with Alerting (MLH SRE Project)

> **AutoHeal** is a self-healing automation system built for Site Reliability Engineering (SRE) use-cases. It continuously monitors your local service (like a Node.js server), logs the health status, and automatically **restores it** when failure is detected. Real-time alerts are sent via Discord Webhook.

---

## 🎯 Why I Built This – My Developer Pain Point

As developers, we often build and deploy full-stack applications using free-tier providers like **Render**, **MongoDB Atlas**, or **Railway**. These platforms are amazing for quick MVPs or hackathon builds—but they come with hidden quirks.

One of the most frustrating issues is:

> **Free-tier services go idle or even stop completely after a period of inactivity.**

* Your **Node.js server** hosted on Render might automatically stop if no requests are made for a while.
* Your **MongoDB Atlas cluster** can get paused, and you may need to manually **restart the cluster** or even **regenerate API keys**.
* Some platforms even revoke resources altogether if the service hasn’t been pinged for too long.

This isn’t an issue at first, but:

* Over time, your projects become unresponsive.
* You’re left wondering *“When did my backend even go down?”*
* Debugging why your frontend is failing becomes a hunt.

---
### 🔧 My Solution: AutoHeal

While learning **Bash scripting**, I thought:

> “What if I write a script that not only checks if my service is down—but also **auto-restarts it** and **sends me a Discord notification**?”

That’s how **AutoHeal** was born.

It’s simple, extensible, and just works:

* 🛡️ Keeps my services alive on my local test environment.
* 🧠 Helps me debug early instead of realizing my app died days ago.
* 🛎️ Sends alerts the moment downtime happens—no surprises later.

---
<img width="1432" alt="Image" src="https://github.com/user-attachments/assets/1f87780d-5324-41a6-b6ac-b34255ac78e5" />
<img width="1440" alt="Image" src="https://github.com/user-attachments/assets/46bac8a6-87c6-432a-81c4-5b66f24a514c" />
---

## 📁 Folder Structure

```
AutoHeal/
├── autoheal.sh           # Main loop script running every 60 sec
├── health_check.sh       # Checks CPU, memory, disk, and service status
├── sendAlert.js          # Sends Discord alert on recovery
├── autoheal.log          # Log file for health events
├── demo-service/
│   ├── index.js          # Express server (to simulate an app)
│   └── package.json      # Node dependencies
└── README.md             # This file
```

---

## 🛠️ Prerequisites

Make sure you have:

* Linux/macOS with `bash`, `systemd`, and `Node.js`
* `curl`, `free`, and `df` installed
* A Discord webhook URL (for alerts)

---

## 🚀 Project Setup

### 1. Clone and Navigate

```bash
git clone https://github.com/kovacs7/AutoHeal.git
cd AutoHeal
```

---

### 2. Install Node.js App (demo-service)

```bash
cd demo-service
npm install
```

Start the app manually to test:

```bash
node index.js
# Output: Demo service on port 4000
```

Test in browser: `http://localhost:4000` → ✅ `🚀 Demo service is running`

---

### 3. Create a systemd Service File

This is the service we’re monitoring and healing!

```bash
sudo nano /etc/systemd/system/your-app.service
```

Paste the following:

```ini
[Unit]
Description=Demo Node.js App
After=network.target

[Service]
ExecStart=/usr/bin/node /absolute/path/to/AutoHeal/demo-service/index.js
Restart=always
User=your-username
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Replace:

* `/absolute/path/...` with your real file path.
* `your-username` with your actual Linux user.

Then reload and start the service:

```bash
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable your-app.service
sudo systemctl start your-app.service
```

Check status:

```bash
sudo systemctl status your-app.service
```

---

### 4. Add Your Discord Webhook

Open `.env` and replace this:

```js
DISCORD_WEBHOOK_URL = your_discord_webhook_url
```

---

## 🧪 Simulating a Server Failure

Stop the service manually:

```bash
sudo systemctl stop your-app.service
```

Wait \~60 seconds. AutoHeal will:

* Detect the failure
* Restart the service
* Log the event in `autoheal.log`
* Send a Discord alert

---

## 🌀 Running AutoHeal

Run it in the background with logging:

```bash
nohup bash autoheal.sh &
```

This runs `health_check.sh` every 60 seconds via a loop and logs into `autoheal.log`.

---

## 📂 View Logs

Inspect real-time logs:

```bash
tail -f autoheal.log
```

Example entries:

```
Sun May 18 18:44:25 IST 2025: OK: CPU=7.2, MEM=64.1294, DISK=36, SERVICE=inactive
Sun May 18 18:44:25 IST 2025: OK: CPU=7.9, MEM=64.1294, DISK=36, SERVICE=inactive
```

---

## ❌ Stop AutoHeal

Find process ID and kill:

```bash
ps aux | grep autoheal.sh
kill <PID>
```

To stop your service manually:

```bash
sudo systemctl stop your-app.service
```

---

## 🧠 What Each File Does

| File                    | Purpose                                                   |
| ----------------------- | --------------------------------------------------------- |
| `autoheal.sh`           | Infinite loop runner, triggers health checks every minute |
| `health_check.sh`       | Checks CPU, RAM, disk space, and app service status       |
| `sendAlert.js`          | Sends a POST to Discord on service restart                |
| `autoheal.log`          | Logs every health check & recovery                        |
| `your-app.service`      | systemd-managed service that we’re monitoring             |
| `demo-service/index.js` | Sample Node.js app being monitored                        |



---

## 📌 Ideas to Extend (for Bonus Points)

* Add Slack/Telegram alert support
* Monitor multiple services
* Use Prometheus/Grafana for metrics
* Add Docker health checks
* Build a web dashboard to view log history

---

## 👤 Author

Made with 🛠️ and 💡 by **Asish Kumar Behera**



