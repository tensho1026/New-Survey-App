import { Choice } from "@/types/choice";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

type PollGraphProps = {
  title: string;
  choices: Choice[];
  totalVotes: number;
};

export default function PollGraph({
  title,
  choices,
  totalVotes,
}: PollGraphProps) {
  const chartData = choices.map((choice) => ({
    id: choice.id,
    name: choice.text,
    votes: choice._count.votes,
  }));

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-lg font-bold'>{title} の集計結果</h2>
        <span className='text-sm text-muted-foreground'>
          総投票数: {totalVotes}
        </span>
      </div>

      {/* グラフ */}
      <div className='h-[550px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <XAxis
              dataKey='name'
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor='end'
              height={60}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}票`}
              domain={[0, 10]}
              interval={0}
              allowDecimals={false}
            />
            <Bar dataKey='votes' radius={[4, 4, 0, 0]} fill='#8884d8'>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
