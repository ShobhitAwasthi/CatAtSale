import React from 'react';

class ReloadCats extends React.Component{
    constructor(){
        super();
        this.state={
            newCats:3,
            warning:false
        }
    }
    changeNewCats=(e)=>{
        console.log(e.target.value);
       
        this.setState({newCats:e.target.value});
        console.log(this.state.newCats);
    }
    getMoreCats=()=>{
        if(this.state.newCats===null||this.state.newCats===undefined||this.state.newCats===""||isNaN(this.state.newCats) ||(this.state.newCats<3)||(this.state.newCats>20))
        {
        this.setState({warning:true})
        return
        }
        this.setState({warning:false})
        this.props.getMoreCats(this.state.newCats);

    }
    render(){
        return(
            <>
            <div className="reload">
            <p>
             Reload the CAT SHOP with how many cats?
            </p>
            <input type="text" id="cats"  value={this.state.newCats} style={{width:"20px"}}onChange={(e)=>this.changeNewCats(e)}/>
            <input type="submit" value="Get Cats!!!!" id="getCatButton"onClick={this.getMoreCats}/>
            </div>
            {(this.state.warning)?<div style={{color:"red"}}><b>Enter a number greater than 2 and less than 21!</b></div>:""}
            </>
        );
    }
}
export default ReloadCats;