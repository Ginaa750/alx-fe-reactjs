// If you installed "react-query" v3:
import { useQuery } from 'react-query'
// If you installed the modern package instead, use this import:
// import { useQuery } from '@tanstack/react-query'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
// JSONPlaceholder is a public fake API ideal for demos. :contentReference[oaicite:1]{index=1}

async function fetchPosts() {
  const res = await fetch(POSTS_URL)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export default function PostsComponent() {
  const {
    data,
    error,
    isLoading,
    isError,
    isFetching,      // true during background refetch
    refetch,
    dataUpdatedAt,   // timestamp of last successful fetch (ms)
  } = useQuery(['posts'], fetchPosts)

  if (isLoading) {
    return (
      <div style={{ background: '#121c36', padding: 16, borderRadius: 12, border: '1px solid #22315a' }}>
        <p>Loading posts…</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div style={{ background: '#3a1520', padding: 16, borderRadius: 12, border: '1px solid #a43d52' }}>
        <p style={{ margin: 0 }}>Error: {error.message}</p>
        <button onClick={() => refetch()} style={{ marginTop: 10, padding: '8px 12px', borderRadius: 8, border: '1px solid #a43d52', background: 'transparent', color: 'inherit', cursor: 'pointer' }}>
          Try again
        </button>
      </div>
    )
  }

  const lastUpdated = new Date(dataUpdatedAt).toLocaleTimeString()

  return (
    <div style={{ background: '#121c36', padding: 16, borderRadius: 12, border: '1px solid #22315a' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <button
          onClick={() => refetch()}
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #3a4a7a', background: '#1e2a4a', color: 'inherit', cursor: 'pointer' }}
          title="Manually refetch from the server"
        >
          Refetch
        </button>
        <span style={{ opacity: 0.85 }}>
          {isFetching ? 'Updating…' : `Last updated: ${lastUpdated}`}
        </span>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
        {data.slice(0, 10).map((post) => (
          <li key={post.id} style={{ background: '#0f1830', border: '1px solid #3a4a7a', borderRadius: 10, padding: 12 }}>
            <strong style={{ display: 'block', marginBottom: 6 }}>{post.id}. {post.title}</strong>
            <span style={{ opacity: 0.9 }}>{post.body}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
