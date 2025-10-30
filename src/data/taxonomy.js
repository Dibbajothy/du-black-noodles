export const SPECIALTY = {
    Crypto: { bg: '#a16207', fg: '#ffffffff', icon: 'fa-solid fa-key' },
    Web: { bg: '#0369a1', fg: '#ffffff', icon: 'fa-solid fa-code' },
    Rev: { bg: '#c2410c', fg: '#ffffff', icon: 'fa-solid fa-gear' },
    Pwn: { bg: '#be123c', fg: '#ffffff', icon: 'fa-solid fa-bug' },
    Forensics: { bg: '#047857', fg: '#ffffff', icon: 'fa-solid fa-fingerprint' },
    DFIR: { bg: '#8b5cf6', fg: '#ffffff', icon: 'fa-solid fa-shield-halved' },
    Osint: { bg: '#374151', fg: '#ffffff', icon: 'fa-solid fa-magnifying-glass' },
    Networking: { bg: '#1e516dff', fg: '#ffffff', icon: 'fa-solid fa-network-wired' },
    Blockchain: { bg: '#0ea5e9', fg: '#ffffff', icon: 'fa-solid fa-link' },
    Misc: { bg: '#a21caf', fg: '#ffffff', icon: 'fa-solid fa-layer-group' },

        // --- ADDED TAGS ---
    'Online': { bg: '#0369a1', fg: '#ffffff', icon: 'fa-solid fa-globe' },
    'On-Site': { bg: '#047857', fg: '#ffffff', icon: 'fa-solid fa-building' }

}

export function getSpecialty(name) {
    return SPECIALTY[name] || { bg: '#374151', fg: '#ffffff', icon: 'fa-solid fa-circle-question' }
}
