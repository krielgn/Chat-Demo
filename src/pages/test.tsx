import ColorSelector from '@/components/ColorSelector';
import { useRef, type RefObject } from 'react';

interface test {
    ref: RefObject<HTMLInputElement | null>
}

function MyInput({ ref }: test) {
  return <input ref={ref} />;
}

export default function MyForm() {
  const inputRef = useRef<HTMLInputElement>(null);
    const colorRef = useRef<HTMLInputElement>(null);

    function handleClick(){
        console.log(inputRef.current?.value);
        console.log(colorRef.current?.value);
    }

  return (<><MyInput ref={inputRef} /><button onClick={handleClick}>Click!</button><ColorSelector ref={colorRef} startColor={'#765'}></ColorSelector> </>)
}