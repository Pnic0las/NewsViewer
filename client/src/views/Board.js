import React, { useEffect, useState, useRef, Component } from "react";
import { render } from 'react-dom';
import { Stage, Layer, Rect, Circle, Image, Transformer } from 'react-konva';
import Konva from 'konva';

//cercle animé
const TestApp = () => {
    const circ = React.useRef();
    const changeSize = () => {
        circ.current.to({
            scaleX: Math.random() + 0.9,
            scaleY: Math.random() + 0.8,
            duration: 0.2
        });
    };

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Circle
                    x={100}
                    y={100}
                    width={100}
                    height={100}
                    fill="red"
                    shadowBlur={5}
                    draggable
                    ref={circ}
                    onDragStart={changeSize}
                    onDragEnd={changeSize}
                />
            </Layer>
        </Stage>
    );
}

//cercle qui bouge
const Circ = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.setNode(shapeRef.current);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Circle
                onClick={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={e => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y()
                    });
                }}
                onTransformEnd={e => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY)
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};

const initialCircles = [
    {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        fill: "blue",
        id: "circ1"
    },
    {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        fill: "green",
        id: "circ2"
    }
];

const Testboard = () => {
    const [circles, setCircles] = React.useState(initialCircles);
    const [selectedId, selectShape] = React.useState(null);

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={e => {
                const clickedOnEmpty = e.target === e.target.getStage();
                if (clickedOnEmpty) {
                    selectShape(null);
                }
            }}
        >
            <Layer>
                {circles.map((circ, i) => {
                    return (
                        <Circ
                            key={i}
                            shapeProps={circ}
                            isSelected={circ.id === selectedId}
                            onSelect={() => {
                                selectShape(circ.id);
                            }}
                            onChange={newAttrs => {
                                const circs = circles.slice();
                                circs[i] = newAttrs;
                                setCircles(circs);
                            }}
                        />
                    );
                })}
            </Layer>
        </Stage>
    );
};

//IMAGE
const Testpp = () => {
    const [image, setImage] = useState(new window.Image());
    const imageRef = useRef();

    useEffect(() => {
        const img = new window.Image();
        img.crossOrigin = "Anonymous";
        img.src =
            "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80";
        setImage(img);
    }, []);

    useEffect(() => {
        if (image) {
            imageRef.current.cache();
            imageRef.current.getLayer().batchDraw();
        }
    }, [image]);

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Image
                    blurRadius={10}
                    filters={[Konva.Filters.Blur]}
                    x={100}
                    y={200}
                    image={image}
                    ref={imageRef}
                />
            </Layer>
        </Stage>
    );
}

//Clercle qui change de couleur
class ColoredRect extends React.Component {
    state = {
        color: 'green'
    };
    handleClick = () => {
        this.setState({
            color: Konva.Util.getRandomColor()
        });
    };

    render() {
        return (
            <Rect
                x={20}
                y={20}
                width={100}
                height={100}
                fill={this.state.color}
                shadowBlur={15}
                onClick={this.handleClick}
            />
        );
    }
}

class Board extends Component {
    render() {
        return (
            // <Stage width={window.innerWidth} height={window.innerHeight}>
            //     <Layer>
            //         <Text text="Click" />
            //         <ColoredRect />
            //     </Layer>
            // </Stage>
            <Testpp />
            //<TestApp />
            //<Testboard />
            );
    }
}

export default Board;
