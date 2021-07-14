import React from 'react-dom'

const Page = ({satPagePost, total, paginate})=>{
    const number = [];
    let i = 1;
    for(i; i < Math.ceil(total/satPagePost); i++){
        number.push(i);
    }
    return(
        <nav>
            <ul>
                {number.map((no)=>(
                    <li key={no}>
                        <a onClick={()=>paginate(no)} href='#!'>{no}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Page;