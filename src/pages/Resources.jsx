import React, { useMemo } from 'react'
import data from '../data/data.json'

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

const Section = ({ data }) => {
    return (
        <div className="resource-section">
            <h3 className="section-title">
                {data.icon && <i className={`fa-solid ${data.icon}`} style={{ marginRight: '10px', opacity: 0.8 }}></i>}
                {data.title}
            </h3>
            <div className="section-content">
                {data.blocks.map((block, i) => {
                    switch (block.type) {
                        case 'code':
                            return <CodeBlock key={i} label={block.label} code={block.value} />
                        case 'list':
                            return <ToolList key={i} items={block.items} />
                        case 'subtitle':
                            return <h4 key={i} className="sub-header">{block.value}</h4>
                        case 'text':
                            return <p key={i} style={{ marginBottom: '10px', color: 'var(--muted)' }}>{block.value}</p>
                        default:
                            return null
                    }
                })}
            </div>
        </div>
    )
}

export default function Resources() {

    // Group consecutive "half" width sections for grid layout
    const groupedResources = useMemo(() => {
        const grouped = []
        let buffer = []

        if (!data.resources) return []

        data.resources.forEach((res) => {
            if (res.width === 'half') {
                buffer.push(res)
                if (buffer.length === 2) {
                    grouped.push({ type: 'grid', items: buffer })
                    buffer = []
                }
            } else {
                if (buffer.length > 0) {
                    // If left with 1 half item, push it as grid (or single)
                    grouped.push({ type: 'grid', items: buffer })
                    buffer = []
                }
                grouped.push({ type: 'full', item: res })
            }
        })
        // Flush remaining buffer
        if (buffer.length > 0) {
            grouped.push({ type: 'grid', items: buffer })
        }
        return grouped
    }, [])

    return (
        <section className="container resource-page">
            <div className="resource-header">
                <h2 className="h2">The Armory</h2>
                <div className="sub">Knowledge Base & Field Manual</div>
            </div>

            <div className="notion-container">
                {groupedResources.map((group, i) => {
                    if (group.type === 'grid') {
                        return (
                            <div key={i} className="two-col-grid">
                                {group.items.map((res, j) => <Section key={j} data={res} />)}
                            </div>
                        )
                    } else {
                        return <Section key={i} data={group.item} />
                    }
                })}
            </div>
        </section>
    )
}
