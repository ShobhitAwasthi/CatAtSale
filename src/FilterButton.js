import React from 'react';
 class FilterButton extends React.Component{

    filterSelection=(val)=>{
        this.props.filterFunction(val);
    }

     render(){
         return(
         <>
         <div id="btnContainer">
         <b style={{margin:"20px"}}>Filters</b>
         <button className="btn" onClick={()=>this.filterSelection('all')}> Show all</button>
         <button className="btn" onClick={()=>this.filterSelection('cute')}> Cute</button>
         <button className="btn" onClick={()=>this.filterSelection('purrfect')}> Purrfect</button>
         <button className="btn" onClick={()=>this.filterSelection('fluffy')}> Fluffy</button>
        </div>
         </>
         );
     }
 }
 export default FilterButton;