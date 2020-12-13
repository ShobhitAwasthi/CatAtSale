import './App.css';
import AppHeader from './AppHeader.js';
import React from 'react';
import Item from './Item.js';
import left from './images/left.jpg';
import right from './images/right.jpg';
import loading from './images/loading.gif';
import FilterButton from './FilterButton';
import ReloadCats from './ReloadCats.js';
import AppFooter from './AppFooter';



class App extends React.Component{
  constructor(){
    super();
    this.state={
      data:[],
      currentImg:1,
      NUMOFCATS:6,
      filteredList:[]
    }

  }
  componentDidMount(){
    for(let i=0;i<this.state.NUMOFCATS;i++)
    this.fetchData();
  }
  leftClicked=()=>{
   
    console.log("left Clicked"+this.state.currentImg);
    this.setState((prevState)=>({currentImg:(prevState.currentImg-1+this.state.NUMOFCATS)%this.state.NUMOFCATS}))


  }
  rightClicked=()=>{

    console.log("right Clicked"+this.state.currentImg);
    this.setState((prevState)=>({currentImg:(prevState.currentImg+1)%this.state.NUMOFCATS}))

    
  }
  shouldComponentUpdate(){
    if(this.state.data.length>0 && this.state.data.length<(this.state.NUMOFCATS-1) ){
        return false;
    }
    return true;
  }
  filterFunction=(val)=>{
    this.setState({filteredList:this.state.data.filter(cat=>
        {if(val==="all")
          return true;
        else
        return cat.category===val})},()=>{this.setState({NUMOFCATS:this.state.filteredList.length,currentImg:Math.min(1,this.state.filteredList.length-1)})})
  }

  fetchData=()=>{
     fetch('https://api.thecatapi.com/v1/images/search',{
      method: 'GET',
      headers: {
        'X-Api-Key': 'd91a7129-55c8-407a-9a53-d9c5eb9e7f70'
      },
     })
    .then(response=>response.json()).
    then(json=>{
      let random=Math.random();
      if(random<0.33)
        json[0].category="cute";
      else if(random<0.66)
        json[0].category="fluffy";
      else
        json[0].category="purrfect";

      this.setState((prevState)=>({data:[...prevState.data,json[0]],filteredList:[...prevState.data,json[0]]}))
    }).
    catch(error => alert(error.message));
  }
  getMoreCats=(val)=>{
    this.setState({ data:[],
      currentImg:1,
      NUMOFCATS:parseInt(val),
      filteredList:[]},()=>{
        for(let i=0;i<val;i++)
          this.fetchData();
      })
   
  }
  ArrowButton=()=>{
    return(
    <div className="move">
    <div className="left" onClick={this.leftClicked}>
    <img src={left} alt="left"/> 
    </div>
    <div className="right" onClick={this.rightClicked}>
    <img src={right} alt="right"/> 
    </div>
    </div>);
  }
  SlidingPanal=()=>{
    if(this.state.filteredList.length<3||this.state.NUMOFCATS<3)
          return( 
          <div className="slidingPanel">
          <div className="wrap">
          {
          this.state.filteredList.length===this.state.NUMOFCATS?(
          this.state.filteredList.map((cat,i)=>(
          <Item data={cat} indexpic={i} isSelected={this.state.currentImg===i}
          isPrev={((this.state.currentImg-1+this.state.NUMOFCATS)%this.state.NUMOFCATS)===i} isNext={((this.state.currentImg+1)%this.state.NUMOFCATS)===i}/>)))
          :
          <img src={loading} alt="loading" style={{display:"flex",margin:"auto",width:"30%"}}/>
          }
          </div>
          </div>);
    

    if(this.state.NUMOFCATS>2 && this.state.filteredList.length>2){
      if((this.state.currentImg-1+this.state.NUMOFCATS)%this.state.NUMOFCATS>this.state.currentImg){
        return (
        <div className="slidingPanel">
        <div className="wrap">
        <Item data={this.state.filteredList[this.state.currentImg-1+this.state.NUMOFCATS]} indexpic={this.state.currentImg-1+this.state.NUMOFCATS} current={false} isSelected={false}
        isPrev={true} isNext={false}/>
        <Item data={this.state.filteredList[this.state.currentImg]} indexpic={this.state.currentImg} current={true} isSelected={true}
        isPrev={true} isNext={false}/>
        <Item data={this.state.filteredList[this.state.currentImg+1]} indexpic={this.state.currentImg+1} current={true} isSelected={false}
        isPrev={false} isNext={true}/>
        </div>
        </div>)
      }
    if((this.state.currentImg+1+this.state.NUMOFCATS)%this.state.NUMOFCATS<this.state.currentImg){
      return (
        <div className="slidingPanel">
        <div className="wrap">
       <Item data={this.state.filteredList[this.state.currentImg-1]} indexpic={this.state.currentImg-1} current={false} isSelected={false}
        isPrev={true} isNext={false}/>
       <Item data={this.state.filteredList[this.state.currentImg]} indexpic={this.state.currentImg} current={true} isSelected={true}
        isPrev={true} isNext={false}/>
       <Item data={this.state.filteredList[0]} indexpic={this.state.currentImg+1} current={true} isSelected={false}
        isPrev={false} isNext={true}/>
        </div>
        </div>)
    }


    }

  
    return(
        this.state.filteredList.length===this.state.NUMOFCATS?(
        <div className="slidingPanel">
        <div className="wrap">
      <Item data={this.state.filteredList[this.state.currentImg-1]} indexpic={this.state.currentImg-1} current={false} isSelected={false}
      isPrev={true} isNext={false}/>
      <Item data={this.state.filteredList[this.state.currentImg]} indexpic={this.state.currentImg} current={true} isSelected={true}
      isPrev={true} isNext={false}/>
      <Item data={this.state.filteredList[this.state.currentImg+1]} indexpic={this.state.currentImg+1} current={true} isSelected={false}
      isPrev={false} isNext={true}/>
      </div>
      </div>)
      :
      <div className="slidingPanel">
      <div className="wrap">
      <img src={loading} alt="loading" style={{display:"flex",margin:"auto",width:"30%"}}/>
      </div>
      </div>);
  }
  render(){
   return (
    <>
    <AppHeader/>    
    <FilterButton filterFunction={this.filterFunction}/>
    <ReloadCats getMoreCats={this.getMoreCats}/>
    <this.ArrowButton/>
    <this.SlidingPanal/>
    <AppFooter/>
    </>
    );
}
}
export default App;
