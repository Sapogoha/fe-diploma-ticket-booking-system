import React from 'react';

import OptionItem from './OptionItem/OptionItem';

import options from '../../../data/options/options';

function Options() {
   return (
      <div>
         {options.map((item) => (
            <OptionItem
               key={item.id}
               title={item.title}
               img={item.img}
               name={item.name}
            />
         ))}
      </div>
   );
}

export default Options;
