import styled, { createGlobalStyle } from 'styled-components';
import { Tooltip } from 'react-tooltip'
import { KeepScale } from 'react-zoom-pan-pinch';

export const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${props => props.theme.colors.background};
    font-family: 'Helvetica Neue', Arial, 'Liberation Sans', FreeSans, sans-serif;
  }
`;

// ======================== Common ========================
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const EmptySpace = styled.div<{ height?: number }>`
  width: 100%;
  height: ${props => props.height || props.theme.size.size4}px;
`;

// ======================== Dashboard ========================
export const Container = styled(FlexColumn)`
  margin: 0 auto;
  width: 80vw;
  max-width: 1280px;
  padding: ${props => props.theme.size.size4} 0;
  gap: ${props => props.theme.size.size7};
`;

export const Block = styled(FlexColumn)`
  position: relative;
  margin: 0 0;
  background-color: ${props => props.theme.colors.foreground};
  padding: ${props => props.theme.size.size4};
  border: ${props => props.theme.size.blockBorderWidth} solid ${props => props.theme.colors.borderPrimary};
  border-radius: ${props => props.theme.size.blockRadius};
`;

export const BlockTitle = styled(FlexRow)`
  align-items: flex-start;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.size.blockTitle};
  font-weight: bold;
  margin-bottom: ${props => props.theme.size.size3};
`

export const Input = styled.input`
  padding: ${props => props.theme.size.size3};
  border: ${props => props.theme.size.blockBorderWidth} solid ${props => props.theme.colors.borderPrimary};
  border-radius: ${props => props.theme.size.blockRadius};
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.input};
  font-size: ${props => props.theme.size.size4};
`

export const Button = styled.button`
  padding: ${props => props.theme.size.size3};
  border: ${props => props.theme.size.blockBorderWidth} solid ${props => props.theme.colors.borderPrimary};
  border-radius: ${props => props.theme.size.blockRadius};
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.size.size4};
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`

export const FloatLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: ${props => props.theme.size.size2} ${props => props.theme.size.size3};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.size.blockTitle};
  font-weight: bold;
  border: ${props => props.theme.size.blockBorderWidth} solid ${props => props.theme.colors.borderPrimary};
`

// ======================== Treemap ========================
export const TreemapView = styled(FlexColumn)`
  width: calc(80vw - 38px);
  gap: ${props => props.theme.size.treemapGap};
  padding: ${props => props.theme.size.treemapGap};
`

export const TreemapRow = styled(FlexRow)<{ height: number }>`
  height: ${props => props.height}px;
  position: relative;
  align-items: center;
` 

export const TreemapItem = styled.a<{ width: string, height: number, value: number, zIndex: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  width: ${props => props.width};
  height: ${props => props.height}px;
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.value > 0 ? props.theme.colors.treemapGreen : props.theme.colors.treemapRed};
  outline: ${props => props.theme.size.treemapGap} solid ${props => props.theme.colors.foreground};
  z-index: ${props => props.zIndex};
  &:hover {
    outline: ${props => props.theme.size.treemapGap} solid ${props => props.theme.colors.primary};
    z-index: 300;
  }
`

export const TreemapTitle = styled.div`
  font-size: ${props => props.theme.size.size4};
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.size.size1};
`

export const TreemapPercentage = styled(TreemapTitle)<{ type: number }>`
  color: ${props => props.type > 0 ? props.theme.colors.positiveText : (props.type < 0 ? props.theme.colors.negativeText : props.theme.colors.text)};
  font-size: ${props => props.theme.size.size4};
  font-weight: normal;
`

export const TreemapTooltip = styled(Tooltip)`
  background-color: ${props => props.theme.colors.foreground} !important;
  z-index: 1000;
`

export const TreemapTooltipInner = styled(FlexColumn)`
  align-items: center;
  justify-content: center;
  max-width: 200px;
  line-break: anywhere;
`

export const TreemapKeepScale = styled(KeepScale)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`