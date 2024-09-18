const FooterComponent = () => {
  return (
    <footer className="w-full h-[50px] dark:bg-neutral-800 bg-slate-500">
      <div className="w-full h-full flex justify-center items-center text-stone-500">{`@${new Date().getFullYear()}`}</div>
    </footer>
  );
};

export default FooterComponent;
