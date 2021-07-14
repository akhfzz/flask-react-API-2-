import React, {useState, useEffect} from 'react';
import Template from './layout';
import Page from './paginate';
import Tweet from './tweet'

function Home(props){
	const [tweet, setTweet] = useState([]); 
	const [pagesSide, setPageSide] = useState(1);
	const [timing, setTiming] = useState(false);
	const [perPageSide] = useState(8);


	const getTweet = async () => {
		const data = await fetch('http://127.0.0.1:5000/tweet');
		const rest = await data.json();
		setTweet(rest);
	}

	const paginateNumber = number => setPageSide(number);
	const lastIndex = pagesSide * perPageSide;
	const firstIndex = lastIndex - perPageSide;
	const situate = tweet.slice(firstIndex, lastIndex);

	useEffect(()=>{
		getTweet();
	})
	return(
		<>
			<Template/>
			<h2>Tweet Crypto</h2>
			<Tweet postTw={situate} load={timing}/>
			<Page satPagePost={perPageSide} 
			total={tweet.length}
			paginate={paginateNumber}/>
		</>
	)
}
export default Home;