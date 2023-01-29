import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

function TopCardItem({ label, data }: InferProps<typeof TopCardItem.propTypes>) {
  return (
    <div className="flex bg-[#101021] shadow-lg shadow-[#FF514D] justify-between p-4 border border-[#FF514D] rounded-full">
      <div className="grid items-center m-auto">
          <p className="grid-col-1 grid-row-1 text-2xl text-[#EAD5E6] font-bold">
            {data}
          </p>
          <p className="text-[#7D98A1]">{label}</p>
      </div>
    </div>
  );
}

TopCardItem.propTypes = {
  label: PropTypes.string,
  data: PropTypes.string
}

export default TopCardItem;
