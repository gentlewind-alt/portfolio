import { Movie } from './types';

export async function getMovies(username: string): Promise<Movie[]> {
  try {
    const res = await fetch(`https://letterboxd.com/${username}/rss/`, {
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        if (res.status === 404) {
             console.warn(`Letterboxd feed not found for user: ${username}`);
             return [];
        }
        console.warn(`Failed to fetch Letterboxd feed: ${res.status}`);
        return [];
    }

    const xmlText = await res.text();
    
    // Simple regex-based parsing to avoid heavy XML libraries and browser/node inconsistencies
    const items = xmlText.match(/<item>[\s\S]*?<\/item>/g) || [];
    
    return items.map((itemStr) => {
        const titleMatch = itemStr.match(/<letterboxd:filmTitle>(.*?)<\/letterboxd:filmTitle>/);
        const linkMatch = itemStr.match(/<link>(.*?)<\/link>/);
        const pubDateMatch = itemStr.match(/<pubDate>(.*?)<\/pubDate>/);
        const ratingMatch = itemStr.match(/<letterboxd:memberRating>(.*?)<\/letterboxd:memberRating>/);
        const yearMatch = itemStr.match(/<letterboxd:filmYear>(.*?)<\/letterboxd:filmYear>/);
        const descMatch = itemStr.match(/<description>([\s\S]*?)<\/description>/);
        
        let image = '';
        if (descMatch) {
            const imgMatch = descMatch[1].match(/src="([^"]+)"/);
            if (imgMatch) image = imgMatch[1];
        }

        return {
            title: titleMatch ? titleMatch[1] : '',
            link: linkMatch ? linkMatch[1] : '',
            pubDate: pubDateMatch ? pubDateMatch[1] : '',
            rating: ratingMatch ? parseFloat(ratingMatch[1]) : 0,
            image,
            year: yearMatch ? yearMatch[1] : '',
        };
    }).slice(0, 6);

  } catch (error) {
    console.error('Error fetching Letterboxd feed:', error);
    return [];
  }
}
