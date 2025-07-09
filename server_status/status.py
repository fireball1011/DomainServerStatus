import json
import os
import platform
import subprocess
import socket

SERVERS_FILE = os.path.join(os.path.dirname(__file__), '..', 'servers.json')


def load_servers():
    if os.path.exists(SERVERS_FILE):
        with open(SERVERS_FILE, 'r') as f:
            return json.load(f)
    return []


def ping(hostname):
    system = platform.system().lower()
    if system == 'windows':
        cmd = ['ping', '-n', '1', hostname]
    else:
        cmd = ['ping', '-c', '1', hostname]
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return result.returncode == 0


def check_port(hostname, port):
    try:
        with socket.create_connection((hostname, port), timeout=2):
            return True
    except OSError:
        return False


def collect_status():
    servers = load_servers()
    for server in servers:
        server_status = {}
        hostname = server.get('hostname')
        server_status['reachable'] = ping(hostname)
        services = server.get('services', [])
        service_status = {}
        for service in services:
            port = service.get('port')
            if port:
                service_status[service['name']] = check_port(hostname, port)
        server_status['services'] = service_status
        server['status'] = server_status
    return servers
