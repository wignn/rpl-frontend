import { FileText, Users, Home } from "lucide-react"

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <div className="flex space-x-2">
          <select title="s" className="border rounded-lg px-3 py-2 bg-white">
            <option>Bulan Ini</option>
            <option>Bulan Lalu</option>
            <option>Tahun Ini</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Kamar</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">24</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600">
            <span className="font-medium">+2</span> dari bulan lalu
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Kamar Terisi</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">18</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600">
            <span className="font-medium">75%</span> tingkat hunian
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Kamar Kosong</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">6</h3>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Home className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-yellow-600">
            <span className="font-medium">25%</span> tersedia
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pendapatan</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">Rp 18.000.000</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <div className="text-green-600 font-bold">Rp</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600">
            <span className="font-medium">+12%</span> dari bulan lalu
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-gray-800">Penghuni baru telah mendaftar untuk Kamar Tipe A</p>
                <p className="text-sm text-gray-500 mt-1">2 jam yang lalu</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

