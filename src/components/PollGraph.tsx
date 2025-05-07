// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart, PieChart } from "lucide-react";
// import { useState } from "react";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// interface PollOption {
//   id: string;
//   text: string;
//   votes: number;
// }

// interface PollVisualizationProps {
//   title: string;
//   options: PollOption[];
//   selectedOption: string | null;
// }

// export default function PollGraph({
//   title,
//   options,
//   selectedOption,
// }: PollVisualizationProps) {
//   const [chartType, setChartType] = useState<"bar" | "pie">("bar");
//   const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

//   // カラーパレット
//   const colors = [
//     "#2563eb",
//     "#7c3aed",
//     "#db2777",
//     "#ea580c",
//     "#65a30d",
//     "#0891b2",
//   ];

//   return (
//     <Card className='h-full'>
//       <CardHeader className='pb-2'>
//         <div className='flex justify-between items-center'>
//           <CardTitle className='text-xl'>{title}の集計結果</CardTitle>
//           <Tabs
//             defaultValue='bar'
//             className='w-[180px]'
//             onValueChange={(value) => setChartType(value as "bar" | "pie")}
//           >
//             <TabsList className='grid w-full grid-cols-2'>
//               <TabsTrigger value='bar' className='flex items-center gap-1'>
//                 <BarChart className='h-4 w-4' />
//                 <span>棒グラフ</span>
//               </TabsTrigger>
//               <TabsTrigger value='pie' className='flex items-center gap-1'>
//                 <PieChart className='h-4 w-4' />
//                 <span>円グラフ</span>
//               </TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className='h-[350px] flex items-center justify-center'>
//           {chartType === "bar" ? (
//             <div className='w-full h-full flex items-end gap-4 pt-8 pb-4'>
//               {options.map((option, index) => {
//                 const percentage =
//                   totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
//                 return (
//                   <div
//                     key={option.id}
//                     className='flex flex-col items-center flex-1'
//                   >
//                     <div
//                       className='w-full rounded-t-md transition-all duration-500 ease-in-out relative group'
//                       style={{
//                         height: `${Math.max(percentage, 2)}%`,
//                         backgroundColor: colors[index % colors.length],
//                         border:
//                           selectedOption === option.id
//                             ? "2px solid #000"
//                             : "none",
//                       }}
//                     >
//                       <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background border px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
//                         {option.votes}票 ({percentage.toFixed(1)}%)
//                       </div>
//                     </div>
//                     <div className='text-xs mt-2 font-medium text-center'>
//                       {option.text}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className='relative w-[300px] h-[300px]'>
//               <svg viewBox='0 0 100 100' className='w-full h-full -rotate-90'>
//                 {options.map((option, index) => {
//                   const percentage =
//                     totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;

//                   // 円グラフのセグメント計算
//                   let cumulativePercentage = 0;
//                   options.slice(0, index).forEach((opt) => {
//                     cumulativePercentage +=
//                       totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
//                   });

//                   const startAngle = (cumulativePercentage / 100) * 360;
//                   const endAngle =
//                     ((cumulativePercentage + percentage) / 100) * 360;

//                   // SVGのパスを計算
//                   const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
//                   const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
//                   const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
//                   const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

//                   // 大きな弧かどうか
//                   const largeArcFlag = percentage > 50 ? 1 : 0;

//                   // パスを作成
//                   const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

//                   return (
//                     <path
//                       key={option.id}
//                       d={pathData}
//                       fill={colors[index % colors.length]}
//                       stroke={selectedOption === option.id ? "#000" : "white"}
//                       strokeWidth={selectedOption === option.id ? "1" : "0.5"}
//                       className='transition-all duration-300 hover:opacity-90'
//                     />
//                   );
//                 })}
//               </svg>
//               <div className='absolute inset-0 flex items-center justify-center rotate-0'>
//                 <div className='text-center'>
//                   <div className='text-2xl font-bold'>{totalVotes}</div>
//                   <div className='text-sm text-muted-foreground'>総投票数</div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className='mt-4 grid grid-cols-2 gap-2'>
//           {options.map((option, index) => {
//             const percentage =
//               totalVotes > 0
//                 ? Math.round((option.votes / totalVotes) * 100)
//                 : 0;
//             return (
//               <div key={option.id} className='flex items-center gap-2'>
//                 <div
//                   className='w-3 h-3 rounded-full'
//                   style={{ backgroundColor: colors[index % colors.length] }}
//                 ></div>
//                 <span
//                   className={`text-sm ${
//                     selectedOption === option.id ? "font-bold" : ""
//                   }`}
//                 >
//                   {option.text}: {option.votes}票 ({percentage}%)
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
