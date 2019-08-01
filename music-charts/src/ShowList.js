import React, { Component } from 'react';
import './ShowList.css';
import { Button, Modal, ModalBody} from 'reactstrap';


class ShowList extends Component {
    constructor() {
        super();
        this.state = {
            trackInfo: null,
            modal: false
        }
        this.toggle = this.toggle.bind(this);

    }
    async trackInfo(item) {
        const url = ` http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=c181c5723583a21ac8d2a3d653463752&mbid=${item}&format=json`;
        const res = await fetch(url);
        const data = await res.json();
        this.setState({ trackInfo: data });
        console.log(this.state);
    }
    async artistinfo(item){
        const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Coldplay&api_key=c181c5723583a21ac8d2a3d653463752&format=json`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    render() {

        if (this.props.items === null) {
            return <div>eroor</div>
        }
        else {
            return (
                <div>
                    <div className="row align-items-center">
                        {this.props.items.tracks.track.map((item, i) => {
                            return <div id={item.mbid} key={i} className="col col-md-2" onClick={this.trackInfo.bind(this, item.mbid)}>
                                <div onClick={this.toggle}>
                                    <div className="itemName" >{item.name}</div>
                                    <div className="itemArtist">{item.artist.name}</div>
                                </div>
                            </div>
                        }
                        )
                        }
                    </div>
                    <div>
                        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalBody>
                                <div>
                                    {(() => {
                                        if (this.state.trackInfo == null) {
                                            console.log("null");
                                        }
                                        else {
                                           if(this.state.trackInfo.track != null){
                                            return <div>
                                            <center>
                                                <img src={this.state.trackInfo.track.album.image[3]["#text"]} alt="imageee not available" />
                                                <div className="itemName">{this.state.trackInfo.track.name}</div>
                                                <div className="rowModal">
                                                    <span className="modalSpan">Album: <span className="modalItem">{this.state.trackInfo.track.album.title}</span></span>
                                                    <span className="modalSpan" >Artist: <span className="modalItem">{this.state.trackInfo.track.artist.name}</span></span>
                                                </div>
                                                <div className="rowModal">
                                                    <span className="modalSpan"><span className="modalItem">{this.state.trackInfo.track.listeners}</span> listeners</span>
                                                    <span className="modalSpan"><span className="modalItem">{this.state.trackInfo.track.playcount}</span> playaccounts</span>
                                                </div>
                                                <div className="rowModal">
                                                    <button className="btn tagButton">{this.state.trackInfo.track.toptags.tag[0].name}</button>
                                                    <button className="btn tagButton">{this.state.trackInfo.track.toptags.tag[1].name}</button>
                                                    <button className="btn tagButton">{this.state.trackInfo.track.toptags.tag[2].name}</button>
                                                    <button className="btn tagButton">{this.state.trackInfo.track.toptags.tag[3].name}</button>
                                                    <button className="btn tagButton">{this.state.trackInfo.track.toptags.tag[4].name}</button>
                                                </div>
                                                <div className="rowModal">
                                                <span className="modalSpan">Published On:<span className="modalItem">{this.state.trackInfo.track.wiki.published}</span></span>
                                                </div>
                                                <div>
                                                    <p>{this.state.trackInfo.track.wiki.summary}</p>
                                                </div>
                                            </center>
                                        </div>
                                           }
                                           else{
                                               return<div className="notFound">
                                                   <h1>Track Not Found</h1>
                                               </div>

                                           }
                                        }

                                    }
                                    )()}
                                </div>
                                <center>
                               <Button className="btn btn-danger"  onClick={this.toggle}>Cancel</Button>
                               </center>
                            </ModalBody>
                        </Modal>
                    </div>
                </div>


            )

        }

    }
}
export default ShowList;