// src/components/FormFields.jsx

export function FormInput({
  label, id, value, onChange, placeholder,
  type = "text", min, required = false,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-barlow-cond font-bold text-[0.67rem] tracking-[3px] uppercase"
        style={{ color: "rgba(249,245,240,0.45)" }}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        className="form-input"
      />
    </div>
  );
}

export function FormSelect({
  label, id, value, onChange, options, required = false,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-barlow-cond font-bold text-[0.67rem] tracking-[3px] uppercase"
        style={{ color: "rgba(249,245,240,0.45)" }}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option
            key={typeof opt === "string" ? opt : opt.value}
            value={typeof opt === "string" ? opt : opt.value}
          >
            {typeof opt === "string" ? opt : opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FormTextarea({
  label, id, value, onChange, placeholder, rows = 3, required = false,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-barlow-cond font-bold text-[0.67rem] tracking-[3px] uppercase"
        style={{ color: "rgba(249,245,240,0.45)" }}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="form-input resize-none"
      />
    </div>
  );
}
