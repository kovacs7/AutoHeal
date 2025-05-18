#!/bin/bash

CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}')
MEM=$(free | grep Mem | awk '{print $3/$2 * 100.0}')
DISK=$(df / | tail -1 | awk '{print $5}' | tr -d '%')

SERVICE_STATUS=$(systemctl is-active your-app.service)

if (( ${CPU%.*} > 80 || ${MEM%.*} > 80 || ${DISK%.*} > 80 || "$SERVICE_STATUS" != "active" )); then
  echo "$(date): ALERT: CPU=$CPU, MEM=$MEM, DISK=$DISK, SERVICE=$SERVICE_STATUS" >> autoheal.log
  systemctl restart your-app.service
  node alerts/sendAlert.js
else
  echo "$(date): OK: CPU=$CPU, MEM=$MEM, DISK=$DISK, SERVICE=$SERVICE_STATUS" >> autoheal.log
fi