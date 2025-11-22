export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container py-8 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold text-primary mb-2">SMK LPPM RI 2 KEDUNGREJA</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Mencetak lulusan yang kompeten, berkarakter, dan siap kerja di bidang Manajemen Perkantoran dan Layanan Bisnis.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold mb-2">Tautan Cepat</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">Beranda</a></li>
                            <li><a href="#" className="hover:text-primary">Profil Jurusan</a></li>
                            <li><a href="#" className="hover:text-primary">Galeri</a></li>
                            <li><a href="#" className="hover:text-primary">Kontak</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold mb-2">Kontak</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Jl. Raya Kedungreja No. 123</li>
                            <li>Cilacap, Jawa Tengah</li>
                            <li>info@smklppmri2.sch.id</li>
                            <li>(0280) 123456</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} SMK LPPM RI 2 KEDUNGREJA. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
