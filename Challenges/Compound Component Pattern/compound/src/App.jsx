import Counter from "./Counter";

export default function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>

      {/* 
      ------------------------------------------------------------
      ❌ Traditional (less flexible) approach:
      The Counter component controls *everything* via props.
      While simple, it limits flexibility and readability.
      ------------------------------------------------------------
      */}
      {/* 
      <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="My NOT so flexible counter"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
        positionCount="top"
      /> 
      */}

      {/* 
      ------------------------------------------------------------
      ✅ Compound Component Pattern version:
      ------------------------------------------------------------
      Instead of passing props for every configuration,
      we nest multiple "subcomponents" inside <Counter>.
      Each subcomponent (e.g. <Counter.Increase />, <Counter.Count />)
      knows how to interact with the Counter’s shared state internally.

      This approach gives users of <Counter> complete control
      over layout, order, and which parts to include — without 
      the parent needing to expose dozens of props.
      ------------------------------------------------------------
      */}
      <Counter>
        {/* Each nested subcomponent accesses shared Counter context */}
        <Counter.Decrease icon="-" />
        <Counter.Count />
        <Counter.Increase icon="+" />
        <Counter.Label>My Super Flex Counter</Counter.Label>
      </Counter>
    </div>
  );
}
