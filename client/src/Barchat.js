import React, { Component } from "react";
import Plot from "react-plotly.js";

class Barchat extends Component {
    render() {
        return (
            <div className="barchart">
                <Plot
                    
                    data={[
                        {
                            type:'bar',
                            x: this.props.x,
                            y: this.props.y,
                        },
                    ]}
                    layout={{ width: 750, height: 500, title: 'A Simple bar chart' }}
                />
            </div>
        )
    }
}

export default Barchat;