import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { stats } from  '../data/statData'

export default function ImpactStats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  console.log('ImpactStats inView:', inView);

  // Safeguard: Make sure stats is an array
  const safeStats = Array.isArray(stats) ? stats : [];

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 text-center text-white">
      {safeStats.map((stat, idx) => (
        <div key={idx} className={`py-12 rounded-lg ${stat.bgColor || ''}`}>
          <div className="text-4xl font-bold">
            {inView ? (
              <CountUp
                start={0}
                end={stat.number || 0}
                duration={2}
                separator=","
                prefix={stat.prefix || ''}
              />
            ) : (
              (stat.prefix || '') + '0'
            )}
          </div>
          <p className="mt-2 text-lg">
            {(stat.label || '').split(' ').map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="font-bold">{word}</span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
