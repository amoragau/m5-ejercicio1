import { ProfilerComponent } from "../components/Profiler";
const ContactView = () => {
  return (
    <ProfilerComponent id="AppointmentView">
      <div className="pt-8">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-center">
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold text-first-color mb-6 text-center">
                Contacto
              </h2>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <strong>Dirección:</strong> Av. Salvador 364, Providencia, Región Metropolitana
                  </p>
                  <p className="text-gray-700">
                    <strong>Teléfono:</strong> +56 9 9123 4567
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> 123@hlc.cl
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfilerComponent>
  );
}
export default ContactView;