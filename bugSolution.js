```javascript
// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Welcome to my Next.js app</h1>
      <p>This is a simple example page.</p>
      <MyComponent/>
    </div>
  );
}

// components/MyComponent.js
export default function MyComponent() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Data from API</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// pages/api/data.js
export default async function handler(req, res) {
  // Simulate an API call that sometimes fails
  const randomNumber = Math.random();
  if (randomNumber < 0.5) {
    res.status(500).json({ error: 'API request failed' });
  } else {
    res.status(200).json({ message: 'API request successful' });
  }
}
```