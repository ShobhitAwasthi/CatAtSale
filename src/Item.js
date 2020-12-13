import React from 'react';

class Item extends React.Component{

    
    render(){

        return(
        <>
       
          <div key={this.props.data.id} className={("itemMain"+this.props.indexpic)}
           id={(this.props.isSelected)?"selected":(this.props.isPrev)?"prev":(this.props.isNext)?"next":"remain"+this.props.indexpic}>
            <img src={this.props.data.url} alt={this.props.data.id} style={{width:'100%'}}/>
            <div>
            <div className="catInfo">
            <p>
            <b>Name:</b>{this.props.data.id}
            <br/>
            <b>Price:</b>{(this.props.data.height===undefined)?"Not Present":this.props.data.height}
            <br/>
            <b>Category:</b>{(this.props.data.category===undefined)?"Not Present":this.props.data.category}
            </p>
            </div>
            </div>
        </div>
         
        
        </>
        );
    }
}

export default Item;