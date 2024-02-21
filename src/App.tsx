import { useState, useRef } from 'react';
import { 
  GlobalStyle, Container, EmptySpace,
  Block, BlockTitle, BlockPs, Input, Button, FloatLabel, ErrorMessage
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
const JSON_SCHEMA = {
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "weight": { "type": "number" },
      "value": { "type": "number" }
    },
    "required": ["name", "weight", "value"]
  }
}
  


function App() {
  const treemapRef = useRef<HTMLDivElement>(null);
  const [ data, setData ] = useState<TreemapData[]>(TEMPLATE_DATA);
  const [ rows, setRows ] = useState<string>('');
  const [ jsonErrorMessage, setJsonErrorMessage ] = useState<string>();
  const [ rowsErrorMessage, setRowsErrorMessage ] = useState<string>();
  const [ submitData, setSubmitData ] = useState<TreemapProps>();

  const getErrorMessage = (type: string) => {
    switch (type) {
      case 'validJson':
        return 'Please enter a valid JSON data.';
      case 'validRows':
        return 'Please enter a valid row number.';
      case 'length':
        return 'Please enter less than 50 items.';
      case 'nameLength':
        return 'Please enter less than 50 characters for the name.';
      case 'weightNumber':
        return 'Please enter a valid number for the weight.';
      case 'valueNumber':
        return 'Please enter a valid number for the value.';
      case 'nameString':
        return 'Please enter a valid name.';
      default:
        return '';
    }
  }

  const onChangeJsonData = (data: TreemapData[]) => {
    validateData(data);
    validateRow(rows, data);
    setData(data);
  }

  const onChangeRows = (value: string) => {
    validateRow(value);
    setRows(value);
  }

  const validateData = (data: TreemapData[]) => {
    let errorType:string = ''

    if(!Array.isArray(data)) errorType = 'validJson';
    else if(data?.length > 50) errorType = 'length';
    for(let item of data) {
      if(item.name === undefined || item.weight === undefined || item.value === undefined) errorType = 'validJson';
      else if(item.name.length >= 50) errorType = 'nameLength';
      else if(typeof item.weight !== 'number' || !Number.isInteger(item.weight)) errorType = 'weightNumber';
      else if(typeof item.value !== 'number') errorType = 'valueNumber';
      else if(typeof item.name !== 'string') errorType = 'nameString';

      if(errorType) break;
    };

    setJsonErrorMessage(getErrorMessage(errorType))

    return errorType;
  }

  const validateRow = (value: string, nextData?: TreemapData[]) => {
    let errorType:string = ''

    if(value === '' || parseInt(value) < 1 || parseInt(value) > (nextData ?nextData.length :data.length)) errorType = 'validRows';

    setRowsErrorMessage(getErrorMessage(errorType));
    
    return errorType;
  }

  const toggleDraw = () => {
    if(jsonErrorMessage || rowsErrorMessage) return;

    const errorData: string = validateData(data);
    const errorRows: string = validateRow(rows);

    if(errorRows || errorData ) return;

    setSubmitData({ data, rows: parseInt(rows) })
    setTimeout(() => treemapRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    ;
  }

  return (
    <div>
      <GlobalStyle />
      <Container>
        <Block>
          <BlockTitle>Step1: Enter your JSON Data</BlockTitle>
          <BlockPs></BlockPs>
          <Editor
            value={data}
            mode={'code'}
            ace={ace}
            htmlElementProps={{style: {height: 350}}}
            onChange={data => onChangeJsonData(data)}
            onValidationError={error => error.length > 0 ?setJsonErrorMessage(getErrorMessage('validJson')) :null}
            scheme={JSON_SCHEMA}
          />
          { jsonErrorMessage && <ErrorMessage>{jsonErrorMessage}</ErrorMessage> }
        </Block>

        <Block>
          <BlockTitle>Step2: Enter row number</BlockTitle>
          {data.length > 0 && <BlockPs>Please enter value between 1 to {data.length}.</BlockPs>}
          <Input type="number" placeholder='3' onChange={e => onChangeRows(e?.target?.value ?? '')} min={1} max={data?.length ?? 1} step={1}/>
          { rowsErrorMessage && <ErrorMessage>{rowsErrorMessage}</ErrorMessage> }
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
