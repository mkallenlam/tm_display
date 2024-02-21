import { useState, useRef } from 'react';
import { 
  GlobalStyle, Container, EmptySpace,
  Block, BlockTitle, Input, Button, FloatLabel
} from './style/styles';
import { JsonEditor as Editor } from 'jsoneditor-react';
import ace from 'brace';

import Treemap from './components/Treemap';

import './style/jsoneditor-theme.css'
import 'brace/mode/json';

const TEMPLATE_DATA = [
  {  "name": "A", "weight": 3, "value": -0.02 },
  {  "name": "B", "weight": 3, "value": 0.05 },
  {  "name": "C", "weight": 6, "value": 0.015 },
  {  "name": "D", "weight": 2, "value": -0.01 },
  {  "name": "E", "weight": 3, "value": 0.01 }
]
  


function App() {
  const treemapRef = useRef<HTMLDivElement>(null);
  const [ data, setData ] = useState<TreemapData[]>(TEMPLATE_DATA);
  const [ rows, setRows ] = useState<number>(3);
  const [ submitData, setSubmitData ] = useState<TreemapProps>();

  const validateData = (data: TreemapData[]) => {
    // Check is valid json
    if(!Array.isArray(data)) {
      alert('Invalid JSON data');
      return;
    } else if(data.length > 50) {
      alert('Too many items');
      return;
    } else if(data.filter(item => item.name.length > 50).length > 0) {
      alert('Item name is too long');
      return;
    } else if(data.filter(item => typeof item.weight !== 'number' || item.weight < 0).length > 0) {
      alert('Invalid weight');
      return;
    }

    setData(data);
  }

  const validateRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if(value < 1 || value > data.length) {
      alert('Invalid row number');
      return;
    }

    setRows(value);
  }

  const toggleDraw = () => {
    setSubmitData({ data, rows: rows })
    setTimeout(() => treemapRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    ;
  }

  return (
    <div>
      <GlobalStyle />
      <Container>
        <Block>
          <BlockTitle>Step1: Enter your JSON Data</BlockTitle>
          <Editor
            value={data}
            mode={'code'}
            ace={ace}
            htmlElementProps={{style: {height: 300}}}
            onChange={data => validateData(data)}
          />
        </Block>

        <Block>
          <BlockTitle>Step2: Enter row number</BlockTitle>
          <Input type="number" placeholder='3' value={rows} onChange={e => validateRow(e)}/>
        </Block>

        <Button onClick={toggleDraw}>Draw</Button>

        <Block ref={treemapRef}>
          <FloatLabel>TreeMap</FloatLabel>
          <EmptySpace height={40}/>
          { submitData && <Treemap data={submitData.data} rows={submitData.rows} /> }
        </Block>

        <EmptySpace height={100}/>
      </Container>
    </div>
  );
}

export default App;
