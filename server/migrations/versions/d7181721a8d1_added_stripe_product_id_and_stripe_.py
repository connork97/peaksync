"""added stripe product id and stripe price id column to memberships and classes

Revision ID: d7181721a8d1
Revises: cfd78bf2156e
Create Date: 2023-05-25 13:34:56.242229

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd7181721a8d1'
down_revision = 'cfd78bf2156e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('memberships', schema=None) as batch_op:
        batch_op.add_column(sa.Column('stripe_product_id', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('stripe_price_id', sa.String(), nullable=True))
        batch_op.drop_column('stripe_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('memberships', schema=None) as batch_op:
        batch_op.add_column(sa.Column('stripe_id', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('stripe_price_id')
        batch_op.drop_column('stripe_product_id')

    # ### end Alembic commands ###
