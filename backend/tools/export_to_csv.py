import csv
from app.app import create_app
from database.utils.db_model import db, Image, Localisation, CaracteristiquesImage

def export_to_csv(filename):
    app = create_app()
    with app.app_context():
        # Requête : Toutes les images avec leurs caractéristiques et localisation
        rows = db.session.query(
            Image.id,
            Image.fichier_nom,
            Image.etat_annot,
            Image.classification_auto,
            Image.date_upload,
            Localisation.latitude,
            Localisation.longitude,
            Localisation.quartier,
            Localisation.ville,
            Localisation.code_postal,
            CaracteristiquesImage.taille_ko,
            CaracteristiquesImage.hauteur,
            CaracteristiquesImage.largeur,
            CaracteristiquesImage.moyenne_rouge,
            CaracteristiquesImage.moyenne_vert,
            CaracteristiquesImage.moyenne_bleu,
            CaracteristiquesImage.contraste,
            CaracteristiquesImage.histogramme,
            CaracteristiquesImage.contours_detectes,
            CaracteristiquesImage.luminance_moyenne,
            CaracteristiquesImage.dark_pixel_ratio,
            CaracteristiquesImage.texture_score
        ).outerjoin(Localisation, Image.id == Localisation.image_id)\
         .outerjoin(CaracteristiquesImage, Image.id == CaracteristiquesImage.id)\
         .all()

        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            # En-têtes
            writer.writerow([
                'id', 'fichier_nom', 'etat_annot', 'classification_auto', 'date_upload',
                'latitude', 'longitude', 'quartier', 'ville', 'code_postal',
                'taille_ko', 'hauteur', 'largeur', 'moyenne_rouge', 'moyenne_vert',
                'moyenne_bleu', 'contraste', 'histogramme', 'contours_detectes',
                'luminance_moyenne', 'dark_pixel_ratio', 'texture_score'
            ])

            for r in rows:
                writer.writerow(r)

        print(f"Export des données terminées dans le fichier {filename}")

if __name__ == '__main__':
    filename = 'dataset.csv'
    export_to_csv(filename)
