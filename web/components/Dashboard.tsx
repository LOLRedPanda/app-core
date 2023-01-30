import { Fragment, useState } from 'react'
import PropTypes, {InferProps} from 'prop-types'
import TopCards from './TopCards';
import BarChart from './BarChart';
import Members from './Members';
import ListBox from './ListBox';

function DashBoard({data}: InferProps<typeof DashBoard.propTypes>) {
  const [selected, setSelected] = useState(data[0])
  return (
    <div className="p-4">
      <ListBox list={data} selected={selected} setSelected={setSelected}/>
      <TopCards teamData={selected} />
      <div className="pt-4 pr-4 grid md:grid-cols-3 grid-cols-1 gap-4 ">
        <BarChart teamData={selected} />
        <Members teamData={selected} />
      </div>
    </div>
  );
}

DashBoard.propTypes = {
    data: PropTypes.any
}

export default DashBoard;
