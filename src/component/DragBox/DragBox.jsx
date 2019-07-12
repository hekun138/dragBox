import React,{ Fragment } from "react";
import './DragBox.css';

class DragBox extends React.Component{
  constructor(props){
    super(props);
    this.disX = 0;
    this.disY = 0;
    this.dragBoxRef = React.createRef();
    this.minifyRef = React.createRef();
    this.onWindowResize = this.onWindowResize.bind(this);
    this.state = {
      minify: null,
      disWin: false
    }
  }
  componentDidMount(){
    window.addEventListener('resize',this.onWindowResize);
    this.onWindowResize();
    this.dragBoxRef.current.addEventListener('mousedown',this.mouseDown)
  }

  componentWillMount(){
    window.removeEventListener('resize',this.onWindowResize);
  }

  onWindowResize(){
    this.dragBoxRef.current.style.left = (document.documentElement.clientWidth - this.dragBoxRef.current.offsetWidth)/2 + 'px';
    this.dragBoxRef.current.style.top = (document.documentElement.clientHeight - this.dragBoxRef.current.offsetHeight)/2 + 'px';
  }

  mouseDown(event){
    const _this = this;
    event = event || window.event;
    this.disX = event.clientX - this.offsetLeft;
    this.disY = event.clientY - this.offsetTop;
    document.onmousemove = function(e){
      e = e || window.e;
      let iL = e.clientX - _this.disX;
      let iT = e.clientY - _this.disY;
      let maxL = document.documentElement.clientWidth - _this.offsetWidth;
      let maxT = document.documentElement.clientHeight - _this.offsetHeight;
      if(iL <= 0){
        iL = 0;
      }
      if(iT <= 0){
        iT = 0;
      }
      if(iL >= maxL){
        iL = maxL;
      }
      if(iT >= maxT){
        iT = maxT;
      }
      _this.style.top = iT + 'px';
      _this.style.left = iL + 'px';
      return false;
    } 
    document.onmouseup = function(){
      document.onmousemove = null;
      document.onmouseup = null;
      this.releaseCapture && this.releaseCapture();
    }
    this.setCapture && this.setCapture();
    return false;
  }
  //最小化窗口
  minify(){
    this.setState({
      minify: true,
      disWin: false
    })
  }
  //打开聊天窗口
  openChatWin(){
    this.setState({
      minify:false,
      disWin:true
    })
  }
  //还原窗口
  revertWin(){
    this.setState({
      minify:false,
      disWin:true
    })
  }
  //关闭窗口
  closeWin(){
    this.setState({
      minify:false,
      disWin:false
    })
  }
  render(){
    return(
      <Fragment>
        <div className="dragBox" ref={this.dragBoxRef} style={{display:this.state.disWin == true ? 'block' : 'none'}}>
          <div className="title" >
            <h2>聊天</h2>
            <div>
              <a href="javascript:;" className="min" onClick={this.minify.bind(this)} ref={this.minifyRef}></a>
              <a href="javascript:;" className="close" onClick={this.closeWin.bind(this)}></a>
            </div>
          </div>
        </div>
        <div>
          <a href="javascript:;" className="open" onClick={this.revertWin.bind(this)} style={{display:this.state.minify == true ? 'block' : 'none'}}></a>
        </div>
        <button onClick={this.openChatWin.bind(this)}>聊天</button>
      </Fragment>   
    )
  }
}

export default DragBox;
