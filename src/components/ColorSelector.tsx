import { useState, type RefObject } from 'react';
import { ChromePicker } from 'react-color';
import { createUseStyles }  from 'react-jss';

const styles = createUseStyles({
    colorPopupLoc: {
        position: 'relative'
    },
    colorPopup: {
      position: 'absolute',
      top: '-50px',
      left: 175 + 'px',
    },
    color: {
        background: (props: ColorSelectorStyleProps) => `${props.color}`,
        width: 30,
        height: 12,
        borderRadius: 2
    },
    colorBlock: {
        visibility: (props: ColorSelectorStyleProps) => `${props.visible ? 'hidden' : 'visible'}`,
        padding: 1,
        display: 'inline-block',
        background: '#fff',
        borderRadius: 1
    }
});

export function getRandomColor() : ColorValueHex {
    const chars = "0123456789abcdef";
    let output : ColorValueHex = "#"
    for (let i = 0; i < 6; i++){
        output += chars.charAt(Math.floor(Math.random() * chars.length));    
    }
    return output;
}

interface ColorSelectorStyleProps {
    color?: ColorValueHex,
    visible: boolean
}
interface ColorSelectorProps {
    //onChange: Function,
    startColor?: ColorValueHex,
    ref: RefObject<HTMLInputElement | null>
}

 export default function ColorSelector({startColor = getRandomColor(), ref} : ColorSelectorProps) {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState(startColor);
    const classes = styles({visible: showPicker, color: selectedColor});

    function handleToggle(){
        setShowPicker(!showPicker);
    }

    function handleColorChange(colors : any){
        //onChange('color', colors.hex);
        setSelectedColor(colors.hex);
    }

    return (<div>
        <button onClick={handleToggle}>
            {showPicker ? "Close Picker" : <div className={classes.colorBlock}><div className={classes.color}></div></div>}
        </button>
        {showPicker ? 
            <div className={classes.colorPopupLoc}>
                <div id="divPicker" className={classes.colorPopup}>                    
                    <ChromePicker disableAlpha={true} onChange={handleColorChange} color={selectedColor} ></ChromePicker>
                </div>
            </div> : <></>}
        <input type="hidden" ref={ref} value={selectedColor}></input>
    </div>)
}