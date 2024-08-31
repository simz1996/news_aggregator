const apiKey = '2b8ebb9977b94302b889375d4bbbce4a';  // Your NewsAPI key
const corsProxy = 'https://api.allorigins.win/get?url=';  // CORS proxy

async function fetchArticles() {
    const topic = document.getElementById('topic').value;
    const container = document.getElementById('news-container');
    container.innerHTML = 'Loading articles...';

    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;
        const response = await fetch(`${corsProxy}${apiUrl}`);
        const data = await response.json();
        const parsedData = JSON.parse(data.contents);  // Parse the JSON response from the proxy

        console.log('API Response:', parsedData);  // Log the response for debugging

        if (parsedData.articles && parsedData.articles.length > 0) {
            container.innerHTML = '';
            parsedData.articles.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.className = 'article';
                articleDiv.innerHTML = `
                    <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
                    <p>Source: ${article.source.name}</p>
                    <p>${article.description}</p>
                `;
                container.appendChild(articleDiv);
            });
        } else {
            container.innerHTML = 'No articles found for this topic.';
        }
    } catch (error) {
        container.innerHTML = 'Failed to load articles. Please try again later.';
        console.error('Error fetching articles:', error);
    }
}

function showSubscriptionMessage() {
    alert('Subscribe for $10 a month to get access to premium features. Payments are processed securely through our payment gateway.');
}
