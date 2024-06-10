interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center">
        <input 
          type="text" 
          placeholder="Search here" 
          className="px-4 py-2 border rounded-lg"
        />
        <div className="ml-4 flex items-center">
          <img src="src/assets/images/logo/avatar_admin.jpg" alt="Admin Avatar" 
          width={300}
          height={300}
          className="w-10 h-10 rounded-full" />
          <div className="ml-2">
            <span className="block">Bảo</span>
            <span className="text-sm text-gray-500">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
