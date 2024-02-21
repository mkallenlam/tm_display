interface TreemapData {
  name: string;
	weight: number;
	value: number;
  [propName: string]: string | number;
}

interface TreemapProps {
  data: TreemapData[];
  rows: number;
}