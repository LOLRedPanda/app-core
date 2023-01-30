import {useState, useEffect} from 'react'
import PropTypes, {InferProps} from 'prop-types'
import TopCards from './TopCards';
import BarChart from './BarChart';
import Members from './Members';
import ListBox from './ListBox';

interface chartData {
  labels: string[];
  datasets: dataset[];
}

interface dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

function DashBoard({data}: InferProps<typeof DashBoard.propTypes>) {
  const [selected, setSelected] = useState(data[0])

  const [chartData, setChartData] = useState<chartData>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "",
        backgroundColor: "",
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: [
        selected.members.top,
        selected.members.jungle,
        selected.members.mid,
        selected.members.adc,
        selected.members.support,
      ],
      datasets: [
        {
          label: "KDA",
          data: [
            selected.stats.KDA.top,
            selected.stats.KDA.jungle,
            selected.stats.KDA.mid,
            selected.stats.KDA.adc,
            selected.stats.KDA.support,
          ],
          borderColor: "#2887F5",
          backgroundColor: "#2887F5",
        },
        {
          label: "CSMP",
          data: [
            selected.stats.CSPM.top,
            selected.stats.CSPM.jungle,
            selected.stats.CSPM.mid,
            selected.stats.CSPM.adc,
            selected.stats.CSPM.support,
          ],
          borderColor: "#ff514d",
          backgroundColor: "#ff514d",
        },
        {
          label: "DMGPM (x100)",
          data: [
            selected.stats.DMGPM.top,
            selected.stats.DMGPM.jungle,
            selected.stats.DMGPM.mid,
            selected.stats.DMGPM.adc,
            selected.stats.DMGPM.support,
          ],
          borderColor: "#ED009C",
          backgroundColor: "#ED009C",
        },
      ],
    });
  }, []);

  return (
    <div className="p-4">
      <ListBox list={data} selected={selected} setSelected={setSelected}/>
      <TopCards teamData={selected} />
      <div className="pt-4 pr-4 grid md:grid-cols-3 grid-cols-1 gap-4 ">
        <BarChart chartData={chartData} />
        <Members teamData={selected} />
      </div>
    </div>
  );
}

DashBoard.propTypes = {
    data: PropTypes.any
}

export default DashBoard;
