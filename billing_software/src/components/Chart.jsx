import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', uv: 400 },
  { name: 'Tue', uv: 300 },
  { name: 'Wed', uv: 200 },
  { name: 'Thu', uv: 278 },
  { name: 'Fri', uv: 189 },
  { name: 'Sat', uv: 239 },
  { name: 'Sun', uv: 349 },
];

function Chart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="rgba(200,200,200,0.2)" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
