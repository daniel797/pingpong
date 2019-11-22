import React from 'react';
//import Sketch from 'react-p5'
import  AppP5 from   './AppP5' 

//import logo from './logo.svg';
import './App.css';
//import { ReactComponent } from '*.svg';

/*
const before = require('aspectjs').before;
let addAdvice = require("aspectjs").addAdvice;
 
let advised, adviser, result;
advised = {
   add: function(increment){
    console.log("incremeta en 2 ")   
    this.left += increment; }, 
   id: 'test', 
   left: 32, 
   top: 43
};
adviser = {
   override: function(increment){
    console.log("iguala el encremto ") 
    advised.left = increment; }
};
 
before(advised, "add").add(adviser, "override");
*/




class App extends React.Component{





  render(){
    //advised.add(2);  // Should equal 4.  
    //console.log(advised)

    return(<div>
      <AppP5></AppP5>
    </div>)
  }
}
export default App;
