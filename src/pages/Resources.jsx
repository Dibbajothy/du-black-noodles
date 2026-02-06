import React from 'react'
import { useState } from 'react'

const Section = ({ title, children, icon }) => (
    <div className="resource-section">
        <h3 className="section-title">
            {icon && <i className={`fa-solid ${icon}`} style={{ marginRight: '10px', opacity: 0.8 }}></i>}
            {title}
        </h3>
        <div className="section-content">
            {children}
        </div>
    </div>
)

const CodeBlock = ({ label, code }) => (
    <div className="code-block-container">
        {label && <div className="code-label">{label}</div>}
        <pre className="code-block">
            <code>{code}</code>
        </pre>
    </div>
)

const ToolList = ({ items }) => (
    <ul className="tool-list">
        {items.map((item, i) => (
            <li key={i}>
                <strong style={{ color: 'var(--accent)' }}>{item.name}</strong>
                {item.desc && <span style={{ color: 'var(--muted)' }}> - {item.desc}</span>}
            </li>
        ))}
    </ul>
)

export default function Resources() {
    // Notion-style layout: centralized, readable, text-focused
    return (
        <section className="container resource-page">
            <div className="resource-header">
                <h2 className="h2">The Armory</h2>
                <div className="sub">Knowledge Base & Field Manual</div>
            </div>

            <div className="notion-container">

                {/* --- CHEAT SHEETS --- */}
                <Section title="Quick Forensics Commands" icon="fa-terminal">
                    <CodeBlock label="Disk Conversion (VDI/VMDK to RAW)" code={`# VDI -> RAW
qemu-img convert -p -O raw disk.vdi disk.raw

# VMDK -> RAW
qemu-img convert -p -O raw disk.vmdk disk.raw

# Mount RAW disk
sudo losetup -Pf --show disk.raw
sudo mount -o ro /dev/loop0p1 /mnt/disk`} />

                    <CodeBlock label="Fast Keyword Search (Riggrep/Grep)" code={`# Fast search for flags (Recursive, Binary safe)
grep -RIn --binary-files=without-match "flag{" /mnt/disk

# Strings search
strings -a /mnt/disk/suspect_file | grep -iE 'flag|ctf|key'

# Riggrep (Modern, faster replacement)
rg -n "flag{" /mnt/disk
rg -a "flag{" /mnt/disk  # Search binary too`} />

                    <CodeBlock label="Find Suspicious Files" code={`# Recently changed files
find /mnt/disk -xdev -type f -printf '%TY-%Tm-%Td %TH:%TM %p\\n' | sort -r | head

# Big or Hidden files
find /mnt/disk -xdev -type f -size +50M -ls
find /mnt/disk -xdev -type f -name ".*" -ls`} />
                </Section>

                <Section title="System Analysis (Linux)" icon="fa-linux">
                    <CodeBlock label="Persistence & Auth" code={`# Users & Passwords
cat /etc/passwd
cat /etc/shadow
cat /etc/sudoers

# SSH Keys
find /home -maxdepth 3 -type f -name "authorized_keys" -o -name "id_rsa*"

# Cron Jobs
ls -la /etc/cron.* /var/spool/cron
cat /etc/crontab

# Systemd Services
ls -la /etc/systemd/system
find /etc/systemd -type f -name "*.service"`} />

                    <CodeBlock label="Logs" code={`# Debian/Ubuntu
cat /var/log/auth.log
cat /var/log/syslog

# RHEL/CentOS
cat /var/log/secure
cat /var/log/messages

# Web & Secrets
ls -la /var/www
grep -RIn "PASS\\|TOKEN\\|KEY\\|SECRET" /etc /home`} />
                </Section>

                {/* --- TOOLS LISTS --- */}
                <div className="two-col-grid">
                    <Section title="Steganography" icon="fa-image">
                        <h4 className="sub-header">Data Hiding & Extraction</h4>
                        <ToolList items={[
                            { name: 'steghide', desc: 'Hide/extract data in image/audio' },
                            { name: 'zsteg', desc: 'Detect steganography in PNG/BMP' },
                            { name: 'stegsolve', desc: 'Image solver with various filters' },
                            { name: 'exiftool', desc: 'Read/write meta information' },
                            { name: 'binwalk', desc: 'Firmware analysis and extraction' },
                        ]} />
                        <h4 className="sub-header">Web Tools</h4>
                        <ToolList items={[
                            { name: 'Aperi\'Solve', desc: 'Online platform for image steganography' },
                            { name: 'FotoForensics', desc: 'ELA (Error Level Analysis)' },
                        ]} />
                    </Section>

                    <Section title="Cryptography & Hash" icon="fa-lock">
                        <h4 className="sub-header">Cracking</h4>
                        <ToolList items={[
                            { name: 'John the Ripper', desc: 'JTR Suite (zip2john, ssh2john, etc.)' },
                            { name: 'Hashcat', desc: 'Advanced GPU-based password recovery' },
                            { name: 'RsaCtfTool', desc: 'RSA attack tool' },
                        ]} />
                        <h4 className="sub-header">Identification</h4>
                        <ToolList items={[
                            { name: 'hash-identifier', desc: 'Identify hash types' },
                            { name: 'CyberChef', desc: 'The Swiss Army Knife' },
                        ]} />
                    </Section>

                    <Section title="Forensics & Analysis" icon="fa-magnifying-glass">
                        <ToolList items={[
                            { name: 'Volatility 3', desc: 'Memory forensics framework' },
                            { name: 'Autopsy', desc: 'Digital forensics platform' },
                            { name: 'Wireshark', desc: 'Network protocol analyzer' },
                            { name: 'NetworkMiner', desc: 'Network forensic analysis tool' },
                        ]} />
                    </Section>

                    <Section title="Reverse Engineering" icon="fa-microchip">
                        <ToolList items={[
                            { name: 'Ghidra', desc: 'SRE suite by NSA' },
                            { name: 'IDA Pro', desc: 'Interactive Disassembler' },
                            { name: 'Radare2', desc: 'Unix-like reverse engineering framework' },
                            { name: 'GDB + Pwndbg', desc: 'Debugger' },
                        ]} />
                    </Section>
                </div>

                <Section title="Guide: Recovering Encrypted Private Data" icon="fa-key">
                    <p style={{ marginBottom: '10px', color: 'var(--muted)' }}>
                        Recovering <code>.ecryptfs</code> directories or <code>.Private</code> folders found during disk analysis.
                    </p>
                    <CodeBlock label="1. Locate and Mount" code={`# Locate the .Private folder
find / -name ".Private" 2>/dev/null

# Attempt recovery (requires wrapped-passphrase or login password)
sudo ecryptfs-recover-private .Private

# If successful, it mounts to /tmp/ecryptfs.XXXXXX
cd /tmp/ecryptfs.XXXXXX
cat flag.txt`} />
                </Section>

            </div>
        </section>
    )
}
