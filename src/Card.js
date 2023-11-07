function Card(props){
    //
    return<div key={props.id}>
        <h2>{props.title}</h2>
        {Object.keys(props).map(k=>(k!='title'&&k!='button'&&k!='id'?k=="compName"?<h4>{props[k]}<br/></h4>:<p>{props[k]}<br/></p>:""))}
        {props.button?<button disabled={props.button.disabled} onClick={props.button.click}>{props.button.name}</button>:""}
    </div>
}

export default Card;