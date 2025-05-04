interface Props {
    temperature: number;
  }
  
  const WeatherDisplay = ({ temperature }: Props) => {
    return (
      <div>
        <h2>現在の気温：{temperature}℃</h2>
      </div>
    );
  };
  
  export default WeatherDisplay;
  