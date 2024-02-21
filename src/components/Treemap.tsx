import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { TreemapView, TreemapRow, TreemapItem, TreemapTitle, TreemapPercentage, TreemapTooltip, TreemapTooltipInner, TreemapKeepScale } from '../style/styles';
import { hp } from '../utils/function';

import 'react-tooltip/dist/react-tooltip.css'

const distributeItemsIntoRows = (data: TreemapData[], rows: number) => {
  // Initialize rows with empty arrays and their corresponding weights
  let rowWeights: number[] = new Array(rows).fill(0);
  let distributedRows: TreemapData[][] = new Array(rows).fill(null).map(() => []);

  data.sort((a,b) => b.weight-a.weight).forEach(item => {
    // Find the index of the row with the minimum weight
    let minWeightRowIndex = rowWeights.indexOf(Math.min(...rowWeights));
    // Add the item to this row
    distributedRows[minWeightRowIndex].push(item);
    // Update the total weight of this row
    rowWeights[minWeightRowIndex] += item.weight;
  });

  if(distributedRows.length > 1) distributedRows.sort((a, b) => b.reduce((acc, item) => acc + item.weight, 0) - a.reduce((acc, item) => acc + item.weight, 0))

  return { distributedRows, maxRowWeight: Math.max(...rowWeights) };
};

const Treemap = ({ data, rows }: TreemapProps) => {
  const rowHeight = Math.min(150, hp(70) / rows); // Show the whole treemap without scrolling
  const {distributedRows, maxRowWeight} = distributeItemsIntoRows(data, rows);

  return (
    <>
      <TransformWrapper
        wheel={{ disabled: true }}
      >
      <TransformComponent>
      <TreemapView>
        {distributedRows.map((row, rowIndex) => (
          <TreemapRow height={rowHeight} key={rowIndex}>
            {row.map((item, itemIndex) => {
              // Calculate the width of the item based on the max item weight of a row and the item weight
              const itemWidth = `calc(${item.weight} / ${maxRowWeight} * 100%)`
              return (
                <TreemapItem
                  data-tooltip-id={"treemap-tooltip"}
                  data-tooltip-content={`${item.name}: ${Math.round(item.value * 10000) / 100}%`}
                  data-tooltip-name={item.name}
                  data-tooltip-value={Math.round(item.value * 10000) / 100}
                  data-tooltip-place="right"
                  data-tooltip-offset={20}
                  key={itemIndex}
                  width={itemWidth}
                  height={rowHeight}
                  value={item.value}
                  zIndex={row.length - itemIndex}
                >
                  <TreemapKeepScale>
                    <TreemapTitle>{item.name}</TreemapTitle>
                    <TreemapPercentage type={item.value > 0 ?1 :(item.value < 0 ?-1 :0)}>{(item.value > 0 ?'+' :'') + Math.round(item.value * 10000) / 100}%</TreemapPercentage>
                  </TreemapKeepScale>
                </TreemapItem>
              );
            })}
          </TreemapRow>
        ))}
        
      </TreemapView>
      </TransformComponent>
      </TransformWrapper>
      
      <TreemapTooltip id="treemap-tooltip" border="1px solid #404040" 
        render={({ activeAnchor }) => {
          const name = activeAnchor?.getAttribute('data-tooltip-name') || 'No name';
          const value = activeAnchor?.getAttribute('data-tooltip-value') || '0';

          return (
            <TreemapTooltipInner>
              { name }: <TreemapPercentage type={parseInt(value) > 0 ?1 :(parseInt(value) < 0 ?-1 :0)}>{(parseInt(value) > 0 ?'+' :'') + value}%</TreemapPercentage>
            </TreemapTooltipInner>
          )
        }}
      />
    </>
  );
};

export default Treemap;