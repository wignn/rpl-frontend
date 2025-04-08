export default function ReportSkeleton() {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
  
        {/* Filter skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
  
        {/* Table skeleton */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <div className="h-6 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
  
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[...Array(6)].map((_, i) => (
                    <th key={i} className="px-6 py-3 text-left">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(5)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {[...Array(6)].map((_, colIndex) => (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`h-4 bg-gray-200 rounded animate-pulse ${
                            colIndex === 0 ? "w-8" : colIndex === 4 ? "w-24" : colIndex === 5 ? "w-16" : "w-32"
                          }`}
                        ></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  