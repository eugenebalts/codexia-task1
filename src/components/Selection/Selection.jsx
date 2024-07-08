import './selection.css';

const Selection = ({ label, options, onChange }) => {
  const handleChange = (event) => {
    const { value } = event.target;

    onChange(value);
  };

  return (
    <div>
      <label>{label}</label>
      <select className='selection' name='selection' onChange={handleChange}>
        {options.map(({ name, value }) => (
          <option key={name + value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selection;
