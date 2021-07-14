import React from 'react';

const Tweet = ({postTw, load})=>{
    if(load){
        return <h2>Loading bro..</h2>
    }
    return(
        
		<table>
            <tr>
                <th>Id</th>
                <th>Posted</th>
                <th>Tweet</th>
                <th>Username</th>
            </tr>
            {postTw.map((tw)=>
            (
                <tr key={tw._id}>
                    <td>{tw._id}</td>
                    <td>{tw.post}</td>
                    <td>{tw.tweet}</td>
                    <td>{tw.username}</td>
                </tr>
            ))}
        </table>
    )
}
export default Tweet;