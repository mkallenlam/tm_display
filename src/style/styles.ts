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
  height: ${props => props.height || props.theme.size.size4}px;
  width: 100%;
`;

// ======================== Dashboard ========================
export const Container = styled(FlexColumn)`
  padding: ${props => props.theme.size.size4} 0;
  gap: ${props => props.theme.size.size7};
  margin: 0 auto;
  width: 80vw;
  max-width: 1280px;
`;

export const Block = styled(FlexColumn)`
  background-color: ${props => props.theme.colors.foreground};
  padding: ${props => props.theme.size.size4};
  border: ${props => props.theme.size.blockBorderWidth} solid ${props => props.theme.colors.borderPrimary};
  border-radius: ${props => props.theme.size.blockRadius};
  position: relative;
  margin: 0 0;
`;

export const BlockTitle = styled(FlexRow)`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.size.blockTitle};
  margin-bottom: ${props => props.theme.size.size1};
  align-items: flex-start;
  font-weight: bold;
`

export const BlockPs = styled.div`
  color: ${props => props.theme.colors.psText};
  font-size: ${props => props.theme.size.size3};
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
  padding: ${props => props.theme.size.size2} ${props => props.theme.size.size3};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.size.blockTitle};
  border: ${props => props.theme.size.blockBorderWidth} solid ${props => props.theme.colors.borderPrimary};
  position: absolute;
  top: 0;
  left: 0;
  font-weight: bold;
`

export const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.errorText};
  font-size: ${props => props.theme.size.size3};
  margin-top: ${props => props.theme.size.size3};
`

// ======================== Treemap ========================
export const TreemapView = styled(FlexColumn)`
  gap: ${props => props.theme.size.treemapGap};
  padding: ${props => props.theme.size.treemapGap};
  width: calc(80vw - 38px);
`

export const TreemapRow = styled(FlexRow)<{ height: number }>`
  height: ${props => props.height}px;
  position: relative;
  align-items: center;
` 

export const TreemapItem = styled.a<{ width: string, height: number, value: number, zindex: number }>`
  width: ${props => props.width};
  height: ${props => props.height}px;
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.value > 0 ?props.theme.colors.treemapGreen :(props.value < 0 ?props.theme.colors.treemapRed :props.theme.colors.treemapGrey)};
  outline: ${props => props.theme.size.treemapGap} solid ${props => props.theme.colors.foreground};
  z-index: ${props => props.zindex};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    outline: ${props => props.theme.size.treemapGap} solid ${props => props.theme.colors.primary};
    z-index: 300;
  }
`

export const TreemapTitle = styled.div`
  font-size: ${props => props.theme.size.size4};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.size.size1};
  font-weight: bold;
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

export const TreemapZoomControlView = styled(FlexRow)`
  gap: ${props => props.theme.size.treemapGap};
  padding: ${props => props.theme.size.size3};
  position: absolute;
  top: 0;
  right: 3px;
  z-index: 1000;
`

export const TreemapZoomControlButton = styled.button`
  padding: ${props => props.theme.size.size2};
  font-size: ${props => props.theme.size.size4};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-width: 30px;
  min-height: 30px;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`